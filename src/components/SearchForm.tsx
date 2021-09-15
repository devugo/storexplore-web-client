import RenderIcon from './RenderIcon';

const SearchForm = ({
  search,
  readLoading,
  setSearchValue,
  placeholder,
}: {
  search: (e: any) => void;
  readLoading: boolean;
  setSearchValue: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <form className="search-form" onSubmit={search} style={{ marginBottom: 10 }}>
      <div className="search-input">
        <input
          disabled={readLoading}
          placeholder={placeholder}
          className="devugo-input"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="icon" onClick={search}>
          <RenderIcon title="mdi mdi-magnify" />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
