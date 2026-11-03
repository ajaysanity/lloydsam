import HeroSection from "@/components/hero/HeroSection";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import OurStory from "@/components/story/OurStory";
import Entourage from "@/components/entourage/Entourage";
import AttireSection from "@/components/attire/AttireSection";
import EventDetails from "@/components/details/EventDetails";
import Gallery from "@/components/gallery/Gallery";
import QaSection from "@/components/qa/QaSection";
import RsvpSection from "@/components/rsvp/RsvpSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CountdownTimer />
      {/* <CinematicSection /> */}
      <OurStory />
      <Entourage />
      <AttireSection />
      <EventDetails />
      <Gallery />
      <QaSection />
      <Footer />
      <RsvpSection />
    </main>
  );
}
