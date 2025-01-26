import type { Dispatch, MouseEvent, SetStateAction } from 'react';

import { Tab } from '@enums';
import { AppControlsItemStyled, AppControlsListStyled } from '@styled';

type Props = {
  activeTab: Tab;
  onTabSelect: Dispatch<SetStateAction<Tab>>;
};

export default function AppControls({ activeTab, onTabSelect }: Props) {
  function handleClick({ currentTarget }: MouseEvent<HTMLLIElement>) {
    onTabSelect(currentTarget.dataset.tab as Tab);
  }

  return (
    <AppControlsListStyled>
      {Object.values(Tab).map((element) => (
        <AppControlsItemStyled
          key={element}
          onClick={handleClick}
          data-tab={element}
          $isActive={activeTab === element}
        >
          {element}
        </AppControlsItemStyled>
      ))}
    </AppControlsListStyled>
  );
}
