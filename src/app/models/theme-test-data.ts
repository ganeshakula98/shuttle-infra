import { Theme } from "./theme"

export const apiTheme: Theme = {
    'primary': '#714eff',
    'accent': 'grey',
    'warn': 'orange',
    'fontFamily': '"Times New Roman", Times, serif'
}

// To use in case api response is failed or theme is not set yet.
export const defaultTheme: Theme = {
    'primary': '#534EF1',
    'accent': 'grey',
    'warn': 'orange',
    'fontFamily': '"Times New Roman", Times, serif'
}