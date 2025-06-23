import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <div className="border-t-2 border-gray-200">
      <div className="py-[48px] px-[32px]">
        <div className="flex flex-col gap-[20px] sm:flex-row md:gap-[30px]">
          <div className="flex flex-col gap-4 w-full text-base font-normal text-gray-500">
            <a
              className="text-sm font-semibold tracking-tight text-gray-900"
              href=""
            >
              О компании
            </a>
            <a href="">О нас</a>
            <a href="">Контакты</a>
            <a href="">Вакансии</a>
          </div>
          <div className="flex flex-col gap-4 w-full text-base font-normal text-gray-500">
            <a
              className="text-sm font-semibold tracking-tight text-gray-900"
              href=""
            >
              Помощь
            </a>
            <a href="">Доставка</a>
            <a href="">Возврат</a>
            <a href="">FAQ</a>
          </div>
          <div className="flex flex-col gap-4 w-full text-base font-normal text-gray-500">
            <a
              className="text-sm font-semibold tracking-tight text-gray-900"
              href=""
            >
              Правовая информация
            </a>
            <a href="">Условия использования</a>
            <a href="">Политика конфиденциальности</a>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="text-sm font-semibold tracking-tight text-gray-900">
              Мы в соцсетях
            </div>
            <div className="flex gap-[20px] items-center">
              <a href="#">
                <FacebookIcon sx={{ color: "#9CA3AF" }} />
              </a>
              <a href="#">
                <InstagramIcon sx={{ color: "#9CA3AF" }} />
              </a>
              <a href="#">
                <TwitterIcon sx={{ color: "#9CA3AF" }} />
              </a>
              <a href="#">
                <img
                  className="max-w-[19px] max-h-[19px]"
                  src="/icons/vk.svg"
                  alt="Логотип ВКонтакте"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-[48px] border-t-2 border-gray-200">
          <div className="flex justify-center pt-[33px] text-base font-normal text-gray-400">
            © 2024 Книжный магазин. Все права защищены.
          </div>
        </div>
      </div>
    </div>
  );
};
