const PhotoContainer = ({ imgSrc, action }: { imgSrc: string; action: () => void }) => {
  return (
    <div className="photo-container" onClick={action}>
      <img src={imgSrc} />
    </div>
  );
};

export default PhotoContainer;
