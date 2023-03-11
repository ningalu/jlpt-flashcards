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
    <table className="table-fixed">
      <thead>
        <tr className="text-gray-400">
          <td className=" w-24">Group</td>
          {[...levels]
            .sort((a, b) => {
              return a.content.length < b.content.length
                ? 1
                : a.content.length > b.content.length
                ? -1
                : 0;
            })[0]
            .content.map((_, i) => {
              return <td className="w-12">{i + 1}</td>;
            })}
        </tr>
      </thead>
      <tbody>
        {levels.map(({ level, content }, i) => {
          return (
            <tr key={i}>
              <td key={i}>{level}</td>
              {content.map((value, i) => (
                <td key={i}>
                  <input
                    type="checkbox"
                    id={`${name} ${i}`}
                    checked={groups.reduce(
                      (acc, curr) =>
                        acc ||
                        compareShallow(curr, {
                          category: category,
                          level: level,
                          number: i + 1,
                        }),
                      false
                    )}
                    onChange={(event) => {
                      console.log(value, i);
                      let selected = {
                        category: category,
                        level: level,
                        number: i + 1,
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
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GroupSelector;
