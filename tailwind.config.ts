import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'dm-dark':  '#1A1A2E',
                'dm-dark2': '#16213E',
                'dm-gold':  '#C9A84C',
                'dm-gold-light': '#E8C878',
                'dm-bg':    '#FAFAF7',
                'dm-bg2':   '#F5F0E8',
                'dm-muted': '#9999BB',
                'dm-input': '#F8F7F4',
                'dm-border':'#E0D9CC',
                'dm-text':  '#1A1A2E',
                'dm-sub':   '#666688',
            },
            fontFamily: {
                georgia: ['Georgia', "'Times New Roman'", 'serif'],
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C878 100%)',
                'dark-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                'bg-gradient':   'linear-gradient(135deg, #FAFAF7 0%, #F5F0E8 100%)',
            },
        },
    },
    plugins: [],
}

export default config
