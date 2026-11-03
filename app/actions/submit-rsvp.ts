"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type RsvpFormState, MAX_ADDITIONAL_GUESTS } from "@/types/rsvp";

const MAX_NAME = 200;
const MAX_MESSAGE = 2000;

export async function submitRsvp(
  _prevState: RsvpFormState,
  formData: FormData
): Promise<RsvpFormState> {
  const fullNameRaw = formData.get("full_name");
  const additionalRaw = formData.get("additional_guests");
  const attendanceRaw = formData.get("attendance");
  const messageRaw = formData.get("message");

  if (
    typeof fullNameRaw !== "string" ||
    typeof additionalRaw !== "string" ||
    typeof attendanceRaw !== "string"
  ) {
    return { ok: false, error: "Invalid form data.", errorFields: [] };
  }

  const full_name = fullNameRaw.trim();
  if (!full_name || full_name.length > MAX_NAME) {
    return { ok: false, error: "Please enter a valid name.", errorFields: ["full_name"] };
  }

  if (attendanceRaw !== "yes" && attendanceRaw !== "no") {
    return { ok: false, error: "Please select attendance.", errorFields: ["attendance"] };
  }

  let additional_guests = 0;
  if (attendanceRaw === "yes") {
    const parsed = Number.parseInt(additionalRaw, 10);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > MAX_ADDITIONAL_GUESTS) {
      return {
        ok: false,
        error: `Additional guests must be between 0 and ${MAX_ADDITIONAL_GUESTS}.`,
        errorFields: ["additional_guests"],
      };
    }
    additional_guests = parsed;
  }

  const guest_count = 1 + additional_guests;

  const guest_names: string[] = [];
  if (additional_guests > 0) {
    for (let i = 0; i < additional_guests; i++) {
      const raw = formData.get(`guest_name_${i}`);
      if (typeof raw !== "string") {
        return {
          ok: false,
          error: "Please enter each guest’s full name.",
          errorFields: [`guest_name_${i}`],
        };
      }
      const t = raw.trim();
      if (!t) {
        return {
          ok: false,
          error: "Please enter each guest’s full name.",
          errorFields: [`guest_name_${i}`],
        };
      }
      if (t.length > MAX_NAME) {
        return {
          ok: false,
          error: "A guest name is too long.",
          errorFields: [`guest_name_${i}`],
        };
      }
      guest_names.push(t);
    }
  }

  for (let j = additional_guests; j < MAX_ADDITIONAL_GUESTS; j++) {
    const extra = formData.get(`guest_name_${j}`);
    if (typeof extra === "string" && extra.trim() !== "") {
      return {
        ok: false,
        error: "Unexpected guest name field.",
        errorFields: ["additional_guests", `guest_name_${j}`],
      };
    }
  }

  let message: string | null = null;
  if (typeof messageRaw === "string") {
    const t = messageRaw.trim();
    if (t.length > MAX_MESSAGE) {
      return { ok: false, error: "Message is too long.", errorFields: ["message"] };
    }
    message = t.length > 0 ? t : null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("submit_rsvp_with_guests", {
      p_full_name: full_name,
      p_guest_count: guest_count,
      p_attendance: attendanceRaw,
      p_message: message ?? "",
      p_guest_names: guest_names,
    });

    if (error) {
      return { ok: false, error: "Could not save your RSVP. Please try again.", errorFields: [] };
    }
  } catch {
    return { ok: false, error: "Server configuration error.", errorFields: [] };
  }

  return { ok: true, error: null };
}
