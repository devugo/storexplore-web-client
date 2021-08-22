const PhotoContainer = ({ imgSrc, action }: { imgSrc: string; action: () => void }) => {
  return (
    <div className="photo-container">
      <img src={imgSrc} onClick={action} />
    </div>
  );
};

export default PhotoContainer;
