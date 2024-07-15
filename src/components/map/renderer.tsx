interface MapItemData {
  place_id: string;
  lat: number;
  lon: number;
  name: string;
  display_name: string;
  type: string;
}

interface MobileCenterItemData {
  place_id: string;
  name: string;
  distance: number;
  cost: number;
}

interface RendererProps {
  setLocationPoint: (value: any) => void;
  setIsSheetOpen: (value: boolean) => void;
  setIsMobileCenter: (value: boolean) => void;
  setSeleted: (value: any) => void;
  value: number;
}

export default class Renderer {
  private setLocationPoint: (value: any) => void;
  private setIsSheetOpen: (value: boolean) => void;
  private setIsMobileCenter: (value: boolean) => void;
  private setSeleted: (value: any) => void;
  private value: number;

  constructor(props: RendererProps) {
    this.setLocationPoint = props.setLocationPoint;
    this.setIsSheetOpen = props.setIsSheetOpen;
    this.setIsMobileCenter = props.setIsMobileCenter;
    this.setSeleted = props.setSeleted;
    this.value = props.value;
  }

  renderMapItem = (data: MapItemData) => (
    <div
      key={data.place_id}
      className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 rounded-xl p-5 flex flex-cols-2"
      onClick={() => {
        this.setLocationPoint([data.lat, data.lon]);
        this.setIsSheetOpen(false);
      }}
    >
      <div className="flex flex-col">
        <h2 className="font-bold">{data.name}</h2>
        <div>
          <p>location: {data.display_name}</p>
          <p>type: <span className="font-bold text-green-600">{data.type}</span></p>
        </div>
      </div>
    </div>
  );

  renderMobileCenterItem = (data: MobileCenterItemData) => {
    if (data.distance > this.value) {
      return null;
    }
    return (
      <div
        key={data.place_id}
        className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 rounded-xl p-5 flex flex-cols-2"
        onClick={() => {
          this.setIsSheetOpen(false);
          this.setIsMobileCenter(false);
          this.setSeleted(data);
        }}
      >
        <div className="flex flex-col">
          <h2 className="font-bold">{data.name}</h2>
          <div>
            <p>distance: <span className="font-bold text-blue-600">{data.distance.toFixed(2)}</span> km</p>
            <p>cost: <span className="font-bold text-green-600">{data.cost}</span> บาท</p>
          </div>
        </div>
      </div>
    );
  };
}
