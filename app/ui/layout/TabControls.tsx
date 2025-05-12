import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
};

export function TabControls<T = any>({
  tab,
  setTab,
  tabs,
}: {
  tab: string;
  setTab: (tab: T) => void;
  tabs: TabItem[];
}) {
  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id as T)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              tab === id
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <TabControls
        tab={activeTab}
        setTab={setActiveTab}
        tabs={tabs.map(({ id, label }) => ({ id, label }))}
      />
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
