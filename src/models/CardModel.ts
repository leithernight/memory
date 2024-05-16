type CardModel = {
    img: string;
    name: string;
    backImg: string;
    status: number;
    onClick: (key: number) => void;
    id: number
}

export default CardModel