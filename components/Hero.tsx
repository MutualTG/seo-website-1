import Link from 'next/link'

export default function Hero() {
  return (
    <>
      {/* App Info Section */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Telegram Icon */}
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 256 256">
                <defs>
                  <linearGradient id="telegramGradient" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2AABEE"></stop>
                    <stop offset="100%" stopColor="#229ED9"></stop>
                  </linearGradient>
                </defs>
                <path fill="url(#telegramGradient)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"></path>
                <path fill="#FFF" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"></path>
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Telegram中文下载中心
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              即时通讯，高效安全，强悍的聊天交友工具
            </p>
          </div>
        </div>
      </section>

      {/* Desktop Download Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link
            href="/download"
            className="block max-w-4xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            <div className="p-8">
              <img
                src="/desk2.png"
                alt="Telegram Desktop"
                className="w-full h-auto mb-6 rounded-lg"
              />
              <div className="flex items-center justify-center gap-3 text-telegram-blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
                  <path fill="#00ADEF" d="m126 1.637l-67 9.834v49.831l67-.534zM1.647 66.709l.003 42.404l50.791 6.983l-.04-49.057zm56.82.68l.094 49.465l67.376 9.509l.016-58.863zM1.61 19.297l.047 42.383l50.791-.289l-.023-49.016z"></path>
                </svg>
                <h2 className="text-2xl font-semibold">
                  下载Telegram for 中文电脑版
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Mobile Download Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Android */}
            <Link
              href="/download"
              className="block bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-8">
                <div className="mb-6 flex justify-center">
                  <img
                    src="/1.gif"
                    alt="Telegram Android"
                    className="w-full h-64 object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-3 text-telegram-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
                    <path fill="#00ADEF" d="M21.005 43.003c-4.053-.002-7.338 3.291-7.339 7.341l.005 30.736a7.34 7.34 0 0 0 7.342 7.343a7.33 7.33 0 0 0 7.338-7.342V50.34a7.345 7.345 0 0 0-7.346-7.337m59.193-27.602l5.123-9.355a1.023 1.023 0 0 0-.401-1.388a1.02 1.02 0 0 0-1.382.407l-5.175 9.453c-4.354-1.938-9.227-3.024-14.383-3.019c-5.142-.005-10.013 1.078-14.349 3.005L44.45 5.075a1.01 1.01 0 0 0-1.378-.406a1.007 1.007 0 0 0-.404 1.38l5.125 9.349c-10.07 5.193-16.874 15.083-16.868 26.438l66.118-.008c.002-11.351-6.79-21.221-16.845-26.427M48.942 29.858a2.772 2.772 0 0 1 .003-5.545a2.78 2.78 0 0 1 2.775 2.774a2.776 2.776 0 0 1-2.778 2.771m30.106-.005a2.77 2.77 0 0 1-2.772-2.771a2.793 2.793 0 0 1 2.773-2.778a2.79 2.79 0 0 1 2.767 2.779a2.767 2.767 0 0 1-2.768 2.77M31.195 44.39l.011 47.635a7.82 7.82 0 0 0 7.832 7.831l5.333.002l.006 16.264c-.001 4.05 3.291 7.342 7.335 7.342c4.056 0 7.342-3.295 7.343-7.347l-.004-16.26l9.909-.003l.004 16.263c0 4.047 3.293 7.346 7.338 7.338c4.056.003 7.344-3.292 7.343-7.344l-.005-16.259l5.352-.004a7.835 7.835 0 0 0 7.836-7.834l-.009-47.635zm83.134 5.943a7.34 7.34 0 0 0-7.341-7.339c-4.053-.004-7.337 3.287-7.337 7.342l.006 30.738a7.334 7.334 0 0 0 7.339 7.339a7.337 7.337 0 0 0 7.338-7.343z"></path>
                  </svg>
                  <h2 className="text-xl font-semibold">
                    下载Telegram for Android安卓版
                  </h2>
                </div>
              </div>
            </Link>

            {/* iOS */}
            <Link
              href="/download"
              className="block bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-8">
                <div className="mb-6 flex justify-center">
                  <img
                    src="/2.gif"
                    alt="Telegram iOS"
                    className="w-full h-64 object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-3 text-telegram-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-8 h-8">
                    <defs>
                      <path id="applePath" d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258s.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854s-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116c-.508.139-1.653.589-1.968.607c-.316.018-1.256-.522-2.267-.665c-.647-.125-1.333.131-1.824.328c-.49.196-1.422.754-2.074 2.237c-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472c.357.013 1.061.154 1.782.539c.571.197 1.111.115 1.652-.105c.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"></path>
                    </defs>
                    <g fill="#00ADEF">
                      <use href="#applePath"></use>
                      <use href="#applePath"></use>
                    </g>
                  </svg>
                  <h2 className="text-xl font-semibold">
                    下载Telegram for iPhone/iPad
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
