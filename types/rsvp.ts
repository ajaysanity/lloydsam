export type RsvpFormState = {
  ok: boolean;
  error: string | null;
  errorFields?: readonly string[];
};

export const rsvpInitialState: RsvpFormState = { ok: false, error: null };

export const MAX_ADDITIONAL_GUESTS = 3;
