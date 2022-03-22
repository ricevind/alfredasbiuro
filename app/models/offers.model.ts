export interface OffersList {
  description: string;
  offers: Offer[];
}

export interface Offer {
  description: string;
  emphasis: boolean;
}

export interface OfficeInNumbers {
  elements: {
    label: string;
    value: number;
    percents?: boolean;
  }[];
}
