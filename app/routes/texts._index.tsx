import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import TextsHomeContainer from "~/components/Texts/TextsHomeContainer";

export default function TextsIndex() {
    return (
        <PageFrame>
            <PageHeader>Sanskrit Texts</PageHeader>
            <TextsHomeContainer />
        </PageFrame>
    );
}