import { ApiBrand, Brand} from "../models";

export const BrandAdapter = (brand: ApiBrand): Brand => {
    return{
        id: brand.id_marca,
        name: brand.nombre,
    }
}

export function BrandListAdapter(apiBrandList: ApiBrand[]): Brand[] {
    return apiBrandList.map(BrandAdapter);
}
