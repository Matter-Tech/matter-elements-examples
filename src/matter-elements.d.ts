declare namespace MatterElements {

    /**
     * Creates an instance of a Single Impact Matter Element, that can be rendered into
     * any container <div>.
     *
     * @param type Impact type.
     * @param portfolio Portfolio definition that should be used to calculate the impact of.
     * @param options Various options to customize the Element.
     * @return An instance of the Element to render to a container.
     */
    function singleImpact(
        type: "co2" | "fossil" | "waste" | "energy",
        portfolio: PortfolioQuery,
        options?: SingleImpactOptions,
    ): SingleImpact;

    /**
     * Sets authorization token. To get this token - request GET /auth/user_token
     * method of the API with your API key.
     *
     * @param token - the API authorization token (a JWT string).
     */
    function setAuthToken(token: string): void;

    // ----------- Aux interfaces -----------
    interface SingleImpact {
        /**
         * Renders the Element to the specified container. This method is bound to the
         * instance, so it's safe to pass it somewhere as a function.
         */
        render(container: HTMLElement): void;

        /**
         * Destroys the element, removing all its DOM. This method is bound to the
         * instance, so it's safe to pass it somewhere as a function.
         */
        destroy(): void;
    }

    interface PortfolioQuery {
        /**
         * An array of portfolio identifiers with weights assigned to them.
         */
        ids: WeightedIdentifier[];
    }

    interface WeightedIdentifier {
        /**
         * Identifier type.
         */
        type: "isin" | "uid" | "uuid";
        /**
         * Identifier value.
         */
        id: string;
        /**
         * Weight of that portfolio in the result.
         */
        weight: number;
    }

    interface SingleImpactOptions {
        /**
         * An array of CSS file URLs to be used by the Element.
         */
        cssUrls?: string[];
        /**
         * An array of URLs to be preloaded as images to improve caching.
         */
        preloadImages?: string[];
        /**
         * An array of URLs to be preloaded as CSS files to improve caching.
         */
        preloadStyles?: string[];
        /**
         * An ordered array of page identifiers. The element will show just the pages specified.
         */
        pages?: string[];
        /**
         * Whether to reset the element to the first page, when the cursor leaves the Element.
         */
        noResetOnLeave?: boolean;
        /**
         * CSS class of the Next button icon. Can be set to "" to remove the icon character.
         * Defaults to "next". Will be prefixed with "mtr-icon-" if set.
         */
        nextIcon?: string;
        /**
         * CSS class of the Done button icon. Can be set to "" to remove the icon character.
         * Defaults to "checked". Will be prefixed with "mtr-icon-" if set.
         */
        doneIcon?: string;
        /**
         * CSS class of the Info button icon. Can be set to "" to remove the icon character.
         * This button is not visible if there is no tooltip info for the page.
         * Defaults to "question". Will be prefixed with "mtr-icon-" if set.
         */
        infoIcon?: string;
        /**
         * CSS class of the progress bar dot icon. Can be set to "" to remove the icon character.
         * Defaults to "dot". Will be prefixed with "mtr-icon-" if set.
         */
        progressIcon?: string;
        /**
         * CSS class of the progress bar dot icon for the currently selected page.
         * Can be set to "" to remove the icon character.
         * Defaults to "long-dot". Will be prefixed with "mtr-icon-" if set.
         */
        progressCurrentIcon?: string;
        /**
         * Tooltip settings.
         */
        tooltip?: {
            /**
             * Either a string with a link to use on all pages, or an object with keys
             * being page ids and values being links to use on corresponding pages.
             */
            readMoreLinks: string | {
                [key: string]: string;
            };
            /**
             * Text for the tooltip button. Defaults to "Read more".
             */
            readMoreText?: string;
            /**
             * The value of the target attribute for the Read More button.
             * Defaults to "_blank" which opens the link in the new tab.
             */
            readMoreOpenTarget?: string;
        };
    }
}
