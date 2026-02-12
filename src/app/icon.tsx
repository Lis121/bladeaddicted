import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
    const fontData = await fetch(
        'https://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nDokq8qT6AIiNJ07Vf_NrVA.ttf'
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 320,
                    background: '#121212',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF5F1F', // Safety Orange
                    fontFamily: 'RobotoCondensed',
                    fontWeight: 700,
                }}
            >
                <div style={{ marginTop: -20 }}>B</div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'RobotoCondensed',
                    data: fontData,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}
