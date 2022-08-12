import styled from 'styled-components';

export const LinkPreview = (props) => {
  const { title, description, link, image } = props;

  const handleLinkPreview = () => window.open(link, '_blank');
  return (
    <PreviewContent onClick={handleLinkPreview}>
      <div>
        <h2 className='title-preview'>{title}</h2>
        <p className='description-preview'>{description}</p>
        <a className='link-preview'>{link}</a>
      </div>
      <img src={image} alt='' />
    </PreviewContent>
  );
};

const PreviewContent = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 115px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 330px;
    height: 100%;
    padding: 20px;

    @media screen and (max-width: 768px) {
      width: calc(100% - 95px);
      padding: 7px 11px;
    }
  }

  .title-preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;

    @media screen and (max-width: 768px) {
      font-size: 11px;
      line-height: 13px;
    }
  }

  .description-preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;

    @media screen and (max-width: 768px) {
      font-size: 9px;
      line-height: 11px;
    }
  }

  .link-preview {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
      font-size: 9px;
      line-height: 11px;
      text-align: start;
    }
  }

  img {
    width: 153px;
    height: 100%;
    border-radius: 0 11px 11px 0;
    position: absolute;
    right: 0;
    top: 0;
    object-fit: cover;

    @media screen and (max-width: 768px) {
      width: 95px;
      height: 115px;
    }
  }
`;
