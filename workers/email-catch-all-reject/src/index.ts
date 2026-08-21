import type { ForwardableEmailMessage } from "@cloudflare/workers-types";

export interface Env {}

const REJECT_REASON =
  "Esta direccion no existe. Para mas ayuda, escribe a contact@yeipi.dev / This address does not exist. For further assistance, please email contact@yeipi.dev";

export default {
  /**
   * Cloudflare Email Routing handler.
   * Catches all incoming unrouted emails and rejects them with an SMTP 550 bounce.
   */
  async email(message: ForwardableEmailMessage, _env: Env, _ctx: ExecutionContext): Promise<void> {
    console.log(`[Email Catch-All Reject] From: ${message.from} -> To: ${message.to}`);
    message.setReject(REJECT_REASON);
  },

  /**
   * HTTP handler for local development and status verification.
   * Prevents raw errors when accessing the worker endpoint directly from a browser.
   */
  async fetch(_request: Request): Promise<Response> {
    return new Response(
      JSON.stringify(
        {
          status: "ok",
          worker: "email-catch-all-reject",
          type: "Email Worker (Cloudflare Email Routing)",
          description: "This worker rejects incoming unrouted emails automatically via SMTP 550 bounce.",
          rejectReason: REJECT_REASON
        },
        null,
        2
      ),
      {
        headers: { "content-type": "application/json; charset=UTF-8" }
      }
    );
  }
};
