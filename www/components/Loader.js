import Router from 'next/router';
import React, {Fragment} from 'react';


const DONE_DURATION = 250;

const Loader = (props) => {
  const [loading, setLoading] = React.useState(null)
  const [timeoutId, setTimeoutId] = React.useState(null)

  const onLoad = () => setLoading(true)
  const onDone = () => {
    setLoading(false)
    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null)
        setLoading(null)
      }, DONE_DURATION)
    )
  }

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onLoad)
    Router.events.on('routeChangeComplete', onDone)
    Router.events.on('routeChangeError', onDone)

    return () => {
      Router.events.off('routeChangeStart', onLoad)
      Router.events.off('routeChangeComplete', onDone)
      Router.events.off('routeChangeError', onDone)
    }
  })

  React.useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId)
    },
    [timeoutId]
  );


  return (
    <Fragment>
        {props.children}
        <div className={loading === null ? '' : loading ? 'loading' : 'done'} />
        <style jsx>{`
            div {
                position: fixed;
                left: 0;
                top: 0;
                bottom:0;
                right: 100%;
                z-index: 9;
                background-color: hsla(0, 0%, 0%, 0.1);
                box-shadow: 0 1px 8px hsla(0, 0%, 0%, 0.1);
                opacity: 0;
                transition-property: right, opacity;
                transition-duration: 0s;
                pointer-events: none;
            }
            .loading {
                right: 5%;
                opacity: 1;
                transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
                transition-duration: 8s, 0s;
            }
            .done {
                right: 0;
                transition-duration: ${DONE_DURATION}ms;
                transition-delay: 0s, ${DONE_DURATION}ms;
            }
        `}</style>
    </Fragment>
  )
}
export default Loader;