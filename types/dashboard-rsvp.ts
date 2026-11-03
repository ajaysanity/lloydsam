export type RsvpGuestRow = {
  id: string;
  rsvp_id: string;
  full_name: string;
  sort_order: number;
};

export type RsvpWithGuests = {
  id: string;
  created_at: string;
  full_name: string;
  guest_count: number;
  attendance: string;
  message: string | null;
  rsvp_guests: RsvpGuestRow[] | null;
};
