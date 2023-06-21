import { Tool, ToolCard } from "./tool";

export const ToolList = ({ items }: { items: Tool[] }) => {
  return (
    <div className="grid auto-rows-fr xl:grid-cols-3 xl:gap-4">
      {items.map((i) => {
        return (
          <ToolCard
            key={i.title}
            title={i.title}
            description={i?.description}
            tags={i?.tags}
            link={i?.link}
          />
        );
      })}
    </div>
  );
};
