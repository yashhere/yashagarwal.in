import classNames from "classnames";
import { FC } from "react";

type TagListProps = {
  tags: string[];
};

const gradients = ["from-purple to-blue", "from-blue to-purple"];

let count = 0;

const getNextGradient = () => {
  const g = gradients[count];
  count++;
  if (count == gradients.length) count = 0;
  return g;
};

export const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((t) => {
        return (
          <div
            key={t}
            className={classNames(
              "transform transition-all",
              "rounded-xl bg-gradient-to-r p-1 shadow-surface-elevation-high mr-2 mt-2",
              getNextGradient()
            )}
          >
            <div className="bg-white rounded-lg px-4 py-2 justify-between h-full">
              <p className="font-medium text-sm">{t}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
