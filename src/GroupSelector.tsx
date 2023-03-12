import React from "react";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow } from "./util";
import { KanaLevels } from "./StaticData";
import { Group } from "./Group";

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
  return (
    <div className="grid">
      <div className="text-gray-400">
        <span className="w-24 inline-block">Group</span>
        {[...levels]
          .sort((a, b) => {
            return a.content.length < b.content.length
              ? 1
              : a.content.length > b.content.length
              ? -1
              : 0;
          })[0]
          .content.map((_, i) => {
            return (
              i < 16 && (
                <div key={i} className="inline-block w-8 m-1">
                  <span className="table m-auto">{i + 1}</span>
                </div>
              )
            );
          })}
      </div>
      {levels.map(({ level, content }, i) => {
        return (
          <div key={i} className="flex">
            <span key={i} className="w-24 py-2">
              {level}
            </span>
            <div className="grid grid-flow-row grid-cols-16">
              {content.map((value, i) => (
                <input
                  type="checkbox"
                  className="w-8 h-8 m-1"
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
                    console.log(value, i);
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
