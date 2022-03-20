export interface CMSMenuItem {
  label: string;
  slug: string;
}

export interface Menuitem extends CMSMenuItem {
  isActive: boolean;
}

export interface LandingPage {
  menuOrder: { value: keyof LandingPage["menu"] }[];
  menu: {
    about: CMSMenuItem;
    contact: CMSMenuItem;
    offer: CMSMenuItem;
  };
  title: string;
  logoImage: string;
  mainWelcome: {
    header1: string;
    header2: string;
    heroImage: string;
  };
  // actionContent: {
  //   question: string;
  //   subQuestion: string;
  //   summary: string;
  // };
  description: string;
  contactLabel: string;
  address: { line1: string; line2: string };
  phones: {
    label: string;
    phone: string;
    type: "cell" | "land";
  }[];
}
