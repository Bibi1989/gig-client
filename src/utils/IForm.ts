export interface IForm {
  target: {
    value: string;
  };
}

export interface IForm2 {
  target: {
    value: string;
    name: string;
  };
}

export interface IForm3 {
  target: {
    textContent: string;
  };
}

export interface IChange {
  onChange: (e: IForm) => void;
}
