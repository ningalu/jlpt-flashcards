import React, { useEffect, useState } from "react";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow } from "./util";
import { KanaLevels } from "./StaticData";
import { Group } from "./Group";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types/config";
export interface GroupSelectorProps {
  category: Category;
  levels: typeof KanaLevels;
  groups: Array<Group>;
  setGroups(groups: Array<Group>): void;
}

const GroupSelector = ({
  category,
  levels,
  groups,
  setGroups,
}: GroupSelectorProps) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="grid lg:w-full w-60">
      <div className="text-gray-400">
        <span className="inline-block lg:w-24 w-10">Group</span>
        {[...levels.values()]
          .sort((a, b) => {
            return a.length < b.length ? 1 : a.length > b.length ? -1 : 0;
          })[0]
          .map((_, i) => {
            return (
              i <
                (width > parseInt(import.meta.env.VITE_LG_WIDTH) ? 16 : 8) && (
                <div key={i} className="inline-block lg:w-8 w-4 h-4 m-1 pl-1">
                  <span className="lg:table lg:m-auto">{i + 1}</span>
                </div>
              )
            );
          })}
      </div>
      {[...levels].map(([level, content], i) => {
        return (
          <div key={i} className="flex">
            <span key={i} className="lg:w-24 w-10 lg:py-2">
              {level}
            </span>
            <div className="grid grid-flow-row lg:grid-cols-16 grid-cols-8">
              {content.map((value, i) => (
                <input
                  type="checkbox"
                  className="lg:w-8 lg:h-8 w-4 h-4 m-1"
                  key={`${level} ${i}`}
                  checked={groups.reduce(
                    (acc, curr) =>
                      acc ||
                      compareShallow(curr, {
                        category: category,
                        level: level,
                        number: i,
                      }),
                    false
                  )}
                  onChange={(event) => {
                    let selected = {
                      category: category,
                      level: level,
                      number: i,
                    };
                    event.target.checked
                      ? setGroups([...groups, selected])
                      : setGroups(
                          [...groups].filter((v) => {
                            return !compareShallow(v, selected);
                          })
                        );
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupSelector;
