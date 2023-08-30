import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Image from "next/image";

const PageTransitions = ({ children, route }) => {
  
  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={route} classNames="page" timeout={1000}>
          <main>
            {children}
          </main>
        </CSSTransition>
      </TransitionGroup>
      <div className="wipe">
        <div className="leaf leaf-fall">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310} alt="..." />
        </div>
        <div className="leaf leaf-fly">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="leaf leaf-fly">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="leaf leaf-fall">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="dragon-organics-logo">
          <Image src="/images/do-logo-title-under.png" width={140} height={190} alt=""/>
        </div>
        <div className="leaf leaf-fall">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="leaf leaf-fall">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="leaf leaf-fly">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
        <div className="leaf leaf-fly">
          <Image src="/images/leaf.png" className="d-block w-100" width={600} height={310}  alt="..." />
        </div>
      </div>
    </>
  );
};

export default PageTransitions;