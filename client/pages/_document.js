import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../lib/gtag';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='no'>
				<Head>
					<meta
						name='description'
						content='Lær hvordan man lager ekte italiensk pizza eller bestill et pizzaevent hvor vi baker pizza ved ditt event for ditt event!'
					/>
					<meta
						name='twitter:card'
						content='Pizzakurs, pizzaevent og Nettbuttikk'
					/>
					<meta
						name='twitter:title'
						content='Francesco Solimeo Pizzachef'
					/>
					<meta
						name='twitter:description'
						content='Lær hvordan man lager ekte italiensk pizza eller bestill et pizzaevent hvor vi baker pizza ved ditt event for ditt event!'
					/>
					<meta
						name='twitter:image'
						content='https://where-your-image-is-hosted/name.jpg'
					/>
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
