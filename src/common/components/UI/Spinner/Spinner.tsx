import { Functional, BaseProps } from '../../../types';
import classes from './Spinner.module.css';


interface SpinnerProps extends BaseProps {
    asOverlay?: boolean
};


const Spinner: Functional<SpinnerProps> = props => (
      <div className={`${props.asOverlay && classes.Overlay}`}>
          <div className={classes.Spinner}></div>
      </div>
);


export default Spinner;