import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createContactInquiry: vi.fn().mockResolvedValue(1),
  createContactAttachment: vi.fn().mockResolvedValue(undefined),
}));

// Mock the storage functions
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test.jpg" }),
}));

// Mock the notification functions
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from "./routers";
import { createContactInquiry, createContactAttachment } from "./db";
import { storagePut } from "./storage";
import { notifyOwner } from "./_core/notification";

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

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a basic inquiry without attachments", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      topic: "estimate",
      message: "他社で200万円と言われました。適正ですか？",
      email: "test@example.com",
    });

    expect(result).toEqual({ success: true, inquiryId: 1 });
    expect(createContactInquiry).toHaveBeenCalledWith({
      topic: "estimate",
      message: "他社で200万円と言われました。適正ですか？",
      email: "test@example.com",
    });
    expect(storagePut).not.toHaveBeenCalled();
    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("他社の見積もりが適正か知りたい"),
      })
    );
  });

  it("submits an inquiry with file attachments", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      topic: "roof",
      message: "屋根の写真を添付します",
      attachments: [
        {
          fileName: "roof.jpg",
          base64: "dGVzdA==", // "test" in base64
          mimeType: "image/jpeg",
          fileSize: 4,
        },
      ],
    });

    expect(result).toEqual({ success: true, inquiryId: 1 });
    expect(storagePut).toHaveBeenCalledTimes(1);
    expect(createContactAttachment).toHaveBeenCalledWith(
      expect.objectContaining({
        inquiryId: 1,
        fileName: "roof.jpg",
        mimeType: "image/jpeg",
        fileSize: 4,
      })
    );
  });

  it("submits an inquiry without message or email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      topic: "subsidy",
    });

    expect(result).toEqual({ success: true, inquiryId: 1 });
    expect(createContactInquiry).toHaveBeenCalledWith({
      topic: "subsidy",
      message: null,
      email: null,
    });
  });

  it("submits an inquiry with empty email string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      topic: "battery",
      email: "",
    });

    expect(result).toEqual({ success: true, inquiryId: 1 });
    expect(createContactInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        email: null,
      })
    );
  });

  it("rejects invalid topic (empty string)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        topic: "",
      })
    ).rejects.toThrow();
  });

  it("sends notification with attachment info", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.contact.submit({
      topic: "other",
      message: "テスト",
      attachments: [
        {
          fileName: "quote.pdf",
          base64: "dGVzdA==",
          mimeType: "application/pdf",
          fileSize: 100,
        },
      ],
    });

    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.stringContaining("quote.pdf"),
      })
    );
  });
});
