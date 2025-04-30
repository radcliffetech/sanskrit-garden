import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import TextsHomeContainer from "~/components/Texts/TextsHomeContainer";

export default function TextsIndex() {
    return (
        <PageFrame>
            <PageHeader>Texts Home (मुख्यपृष्ठम्)</PageHeader>
            <TextsHomeContainer />
        </PageFrame>
    );
}