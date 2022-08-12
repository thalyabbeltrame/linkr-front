import Lottie from 'lottie-react';
import { ThreeDots } from 'react-loader-spinner';
import error from '../assets/lottie/errorRed.json';
import sucess from '../assets/lottie/sucessGreen.json';

export const HandleButtonContent = ({ message }) => {
  const style = { height: 50, width: 50 };
  switch (message) {
    case 'loading':
      return <ThreeDots color='#00BFFF' height={50} width={50} />;
    case 'sucess':
      return <Lottie animationData={sucess} loop={false} style={style} />;
    case 'error':
      return <Lottie animationData={error} loop={false} style={style} />;
    default:
      return message;
  }
};
