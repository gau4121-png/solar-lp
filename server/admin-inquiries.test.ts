import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

const mockInquiries = [
  {
    id: 1,
    topic: "estimate",
    message: "見積もりが適正か知りたい",
    email: "user1@example.com",
    status: "new" as const,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: 2,
    topic: "roof",
    message: "屋根の状態を確認したい",
    email: null,
    status: "read" as const,
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-12"),
  },
];

const mockAttachments = [
  {
    id: 1,
    inquiryId: 1,
    fileName: "roof.jpg",
    fileKey: "contact-attachments/1/abc123.jpg",
    url: "https://example.com/roof.jpg",
    mimeType: "image/jpeg",
    fileSize: 50000,
    createdAt: new Date("2026-01-15"),
  },
];

vi.mock("./db", () => ({
  createContactInquiry: vi.fn().mockResolvedValue(1),
  createContactAttachment: vi.fn().mockResolvedValue(undefined),
  getContactInquiries: vi.fn().mockResolvedValue([]),
  getInquiryById: vi.fn().mockResolvedValue(undefined),
  getAttachmentsByInquiryId: vi.fn().mockResolvedValue([]),
  updateInquiryStatus: vi.fn().mockResolvedValue(true),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test.jpg" }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from "./routers";
import {
  getContactInquiries,
  getInquiryById,
  getAttachmentsByInquiryId,
  updateInquiryStatus,
} from "./db";

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-open-id",
      name: "Admin User",
      email: "admin@example.com",
      loginMethod: "email",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "user-open-id",
      name: "Regular User",
      email: "user@example.com",
      loginMethod: "email",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.list (admin only)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns inquiry list for admin users", async () => {
    vi.mocked(getContactInquiries).mockResolvedValueOnce(mockInquiries);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.list();

    expect(result).toHaveLength(2);
    expect(result[0].topicLabel).toBe("他社の見積もりが適正か知りたい");
    expect(result[1].topicLabel).toBe("自宅の屋根に設置できるか知りたい");
    expect(getContactInquiries).toHaveBeenCalledTimes(1);
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(caller.contact.list()).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.contact.list()).rejects.toThrow();
  });
});

describe("contact.detail (admin only)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns inquiry detail with attachments for admin", async () => {
    vi.mocked(getInquiryById).mockResolvedValueOnce(mockInquiries[0]);
    vi.mocked(getAttachmentsByInquiryId).mockResolvedValueOnce(mockAttachments);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.detail({ id: 1 });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.topicLabel).toBe("他社の見積もりが適正か知りたい");
    expect(result!.attachments).toHaveLength(1);
    expect(result!.attachments[0].fileName).toBe("roof.jpg");
  });

  it("auto-marks new inquiry as read when viewed", async () => {
    vi.mocked(getInquiryById).mockResolvedValueOnce(mockInquiries[0]); // status: "new"
    vi.mocked(getAttachmentsByInquiryId).mockResolvedValueOnce([]);

    const caller = appRouter.createCaller(createAdminContext());
    await caller.contact.detail({ id: 1 });

    expect(updateInquiryStatus).toHaveBeenCalledWith(1, "read");
  });

  it("does not change status when inquiry is already read", async () => {
    vi.mocked(getInquiryById).mockResolvedValueOnce(mockInquiries[1]); // status: "read"
    vi.mocked(getAttachmentsByInquiryId).mockResolvedValueOnce([]);

    const caller = appRouter.createCaller(createAdminContext());
    await caller.contact.detail({ id: 2 });

    expect(updateInquiryStatus).not.toHaveBeenCalled();
  });

  it("returns null for non-existent inquiry", async () => {
    vi.mocked(getInquiryById).mockResolvedValueOnce(undefined);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.detail({ id: 999 });

    expect(result).toBeNull();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(caller.contact.detail({ id: 1 })).rejects.toThrow();
  });
});

describe("contact.updateStatus (admin only)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates inquiry status for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.updateStatus({ id: 1, status: "replied" });

    expect(result).toEqual({ success: true });
    expect(updateInquiryStatus).toHaveBeenCalledWith(1, "replied");
  });

  it("allows setting status back to new", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.updateStatus({ id: 1, status: "new" });

    expect(result).toEqual({ success: true });
    expect(updateInquiryStatus).toHaveBeenCalledWith(1, "new");
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(
      caller.contact.updateStatus({ id: 1, status: "read" })
    ).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.contact.updateStatus({ id: 1, status: "read" })
    ).rejects.toThrow();
  });
});
