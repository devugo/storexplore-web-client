import RenderIcon from './RenderIcon';

const FilterButton = ({ openFilterModal }: { openFilterModal: () => void }) => {
  return (
    <div onClick={openFilterModal} className="filter-button">
      <p>
        Filter <RenderIcon title="mdi mdi-filter-menu" />
      </p>
    </div>
  );
};

export default FilterButton;
