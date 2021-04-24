import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='no'>
				<Head>
					<script
						async
						src='https://www.googletagmanager.com/gtag/js?id=G-QRSCQJW7N1'
					></script>
					<script>
						window.dataLayer = window.dataLayer || []; function
						gtag(){dataLayer.push(arguments)}
						gtag('js', new Date()); gtag('config', 'G-QRSCQJW7N1');
					</script>
					<meta
						name='description'
						content='Personal website with courses, blog and shop'
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
