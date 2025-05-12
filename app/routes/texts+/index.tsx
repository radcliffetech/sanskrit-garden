import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import TextsHomeContainer from "~/components/Texts/TextsHomeContainer";

export default function TextsIndex() {
    return (
        <PageFrame>
            <PageHeader>Texts Home (मुख्यपृष्ठम्)</PageHeader>
            <TextsHomeContainer />
        </PageFrame>
    );
}