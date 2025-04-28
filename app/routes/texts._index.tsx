import { FeatureCard } from "~/components/ui/FeatureCard";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";

export default function TextsIndex() {
    return (
        <PageFrame>
            <PageHeader>Sanskit Texts</PageHeader>
            <p className="text-gray-600 mb-8">
                Explore key Sanskrit texts that have captured Jeffrey's attention. These texts are not just historical artifacts; they are living traditions that continue to inspire and guide seekers on their spiritual journeys. Each text is a doorway into the profound wisdom of Sanskrit literature, offering insights into philosophy, spirituality, and the human experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard to="/texts/nirvana-shaktam" label="Nirvana Shaktam" description="A profound text on the nature of reality and consciousness." />
                <FeatureCard to="/texts/ribhu-gita/chapter-26" label="Ribhu Gita - Chapter 26, Verses 1-8" description="A chapter from the Ribhu Gita, a key text in Advaita Vedanta." />
                <FeatureCard to="/texts/ganesha-panchratnam" label="Ganesha Panchratnam" description="A devotional text dedicated to Lord Ganesha, the remover of obstacles." />
            </div>
        </PageFrame>
    );
}