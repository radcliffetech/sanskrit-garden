import { Link } from "@remix-run/react";
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
                <Link to="/texts/nirvana-shaktam" className="block border rounded-lg shadow-md p-6 hover:bg-gray-50 transition">
                    <h2 className="text-xl font-semibold mb-2">Nirvana Shaktam</h2>
                </Link>
                <Link to="/texts/ribhu-gita/chapter-26" className="block border rounded-lg shadow-md p-6 hover:bg-gray-50 transition">
                    <h2 className="text-xl font-semibold mb-2">Ribhu Gita - Chapter 26, Verses 1-8</h2>
                </Link>
                <Link to="/texts/ganesha-panchratnam" className="block border rounded-lg shadow-md p-6 hover:bg-gray-50 transition">
                    <h2 className="text-xl font-semibold mb-2">Ganesha Panchratnam</h2>
                </Link>
            </div>
        </PageFrame>
    );
}