import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createContactInquiry, createContactAttachment } from "../db";
import { storagePut } from "../storage";
import { notifyOwner } from "../_core/notification";
import { nanoid } from "nanoid";

const TOPIC_LABELS: Record<string, string> = {
  estimate: "他社の見積もりが適正か知りたい",
  roof: "自宅の屋根に設置できるか知りたい",
  subsidy: "補助金について聞きたい",
  battery: "蓄電池の導入を検討している",
  other: "その他",
};

export const contactRouter = router({
  /**
   * Submit a contact inquiry (public, no auth required).
   * Accepts topic, message, optional email, and optional file attachments (base64).
   */
  submit: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1),
        message: z.string().optional(),
        email: z.string().email().optional().or(z.literal("")),
        attachments: z
          .array(
            z.object({
              fileName: z.string(),
              base64: z.string(),
              mimeType: z.string(),
              fileSize: z.number(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Save the inquiry to the database
      const inquiryId = await createContactInquiry({
        topic: input.topic,
        message: input.message || null,
        email: input.email || null,
      });

      // 2. Upload attachments to S3 and save metadata
      const uploadedFiles: Array<{ fileName: string; url: string }> = [];

      if (input.attachments && input.attachments.length > 0) {
        for (const attachment of input.attachments) {
          const suffix = nanoid(8);
          const ext = attachment.fileName.split(".").pop() || "bin";
          const fileKey = `contact-attachments/${inquiryId}/${suffix}.${ext}`;

          // Decode base64 to buffer
          const buffer = Buffer.from(attachment.base64, "base64");

          // Upload to S3
          const { url } = await storagePut(fileKey, buffer, attachment.mimeType);

          // Save attachment metadata to DB
          await createContactAttachment({
            inquiryId,
            fileName: attachment.fileName,
            fileKey,
            url,
            mimeType: attachment.mimeType,
            fileSize: attachment.fileSize,
          });

          uploadedFiles.push({ fileName: attachment.fileName, url });
        }
      }

      // 3. Notify the site owner
      const topicLabel = TOPIC_LABELS[input.topic] || input.topic;
      const attachmentInfo =
        uploadedFiles.length > 0
          ? `\n\n添付ファイル (${uploadedFiles.length}件):\n${uploadedFiles
              .map((f) => `- ${f.fileName}: ${f.url}`)
              .join("\n")}`
          : "";

      await notifyOwner({
        title: `新しいお問い合わせ: ${topicLabel}`,
        content: `相談テーマ: ${topicLabel}\nメッセージ: ${input.message || "(なし)"}\nメールアドレス: ${input.email || "(未入力)"}${attachmentInfo}`,
      });

      return { success: true, inquiryId };
    }),
});
