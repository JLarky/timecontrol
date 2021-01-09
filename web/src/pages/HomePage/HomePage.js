export default () => {
  const [currentState, setPlayerState] = React.useState('UNSTARTED')
  const playerRef = React.useRef(undefined)
  const wrapperRef = React.useRef(null)
  const [size, setSize] = React.useState({
    width: '560',
    height: '315',
  })
  const sizeRef = React.useRef(size)
  sizeRef.current = size
  React.useEffect(() => {
    const { clientWidth: width, clientHeight: height } = wrapperRef.current
    setSize({ width, height })
  }, [])
  React.useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    let player
    var done = false

    window.onYouTubeIframeAPIReady = () => {
      console.log(
        123,
        size,
        (playerRef.current = new YT.Player('yt-player', {
          videoId: 'OOxR4YuXMmQ',
          ...sizeRef.current,
          events: {
            onReady: (e) => {
              console.log(222, e)
              playerRef.current.playVideo()
            },
            onStateChange: (e) => {
              setPlayerState(e.data)
              const names = Object.keys(YT.PlayerState)
              names.forEach((name) => {
                if (e.data === YT.PlayerState[name]) {
                  setPlayerState(name)
                }
              })
            },
          },
        }))
      )
    }
  }, [])

  const done = React.useRef(false)
  React.useEffect(() => {
    if (currentState == 'PLAYING' && !done.current) {
      setTimeout(() => {
        playerRef.current.stopVideo()
      }, 3000)
      done.current = true
    }
  }, [currentState])

  return (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: center;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 32rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
            `,
        }}
      />
      <section>
        <h1>
          <span>Welcome to RedwoodJS!!!</span>
          {currentState}
          <div ref={wrapperRef}>
            <div id="yt-player" height={300} />
          </div>
        </h1>
      </section>
    </main>
  )
}
