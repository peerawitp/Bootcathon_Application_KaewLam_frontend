import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Modal } from '@/components/map/modal';
import { fetchData } from '@/lib/map/fetch-data';

interface SearchBarProps {
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  setMapData: (value: any[]) => void;
  setIsSheetOpen: (value: boolean) => void;
  value: number;
  setValue: (value: number) => void;
  setIsMobileCenter: (value: boolean) => void;
}

export default function SearchBar({
  setLoading, 
  setError, 
  setMapData,
  setIsSheetOpen,
  value,
  setValue,
  setIsMobileCenter
}: SearchBarProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFetchData = () => {
    fetchData({
      searchTerm,
      setLoading,
      setError,
      setMapData,
    });
  }

  const handleSubmit = () => {
    setIsMobileCenter(false);
    handleFetchData();
    setIsSheetOpen(true);
  }

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="flex items-center p-2 px-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg gap-3">
      <SearchIcon 
        className="text-gray-500 dark:text-gray-400 hover:cursor-pointer" 
        onClick={() => handleSubmit()} 
      />
      <Input
        type="text"
        placeholder="ค้นหา ..."
        className="flex-1 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 rounded-lg"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button className='border-2' onClick={() => {
        setIsMobileCenter(true);
        setModal(true)
      }}>Range</Button>
      <Modal modal={modal} setModal={setModal} value={value} setValue={setValue} setIsSheetOpen={setIsSheetOpen} />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}