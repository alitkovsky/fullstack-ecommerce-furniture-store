<div className="container mx-auto w-full py-10">
<div className="flex flex-col xl:flex-row text-center xl:text-left justify-between items-center gap-10">
   <div className="flex-1 order-2 xl:order-none max-w-xl xl:max-w-[410px] min-w-[410px] flex flex-col items-center xl:items-start gap-8">
      <h2 className="text-3xl font-bold">
         50+ Beautiful rooms inspiration
      </h2>
      <p>
         Our designer already made a lot of beautiful prototipe of rooms that inspire you
      </p>
      <Button variant="flat">
         Explore More
      </Button>
   </div>
   <div className="order-1 flex xl:order-none mx-auto xl:max-w-none xl:mx-0 w-full">
      <Swiper
         className="swiper h-[580px]"
         loop={true}
         cssMode={true}
         navigation={true}
         autoHeight={true}
         pagination={true}
         modules={[Pagination, Navigation]}
         slidesPerView={"auto"}
         spaceBetween={24}
         breakpoints={{
            320: {
               slidesPerView: 3,
            },
            834: {
               slidesPerView: 3,
            },
            1200: {
               slidesPerView: 3,
            },
               }}
         >
         {/* <div className="swiper-wrapper"> */}
            <SwiperSlide className="swiper-slide">
               <div className="w-full max-w-[400px] h-[580px] bg-[url('/assets/swiper/slider1.png')] flex flex-col justify-center p-9 mx-auto">
                  <div className="flex gap-4 mb-6">
                     <div>
                        <h3 className="h3">Nattasha Mith</h3>
                        <div>Greenville, USA</div>
                     </div>
                  </div>
                  <p>
                     Lorem Ipsum is simply dummy text of the typesetting industry. Ipsum has been.
                  </p>
               </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
               <div className="testimonial__item w-full max-w-[400px] h-[480px] bg-[url('/assets/swiper/slider2.png')] bg-no-repeat flex flex-col justify-center p-9 mx-auto">
               </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
               <div className="testimonial__item w-full max-w-[400px] h-[480px] bg-[url('/assets/swiper/slider3.png')] bg-no-repeat flex flex-col justify-center p-9 mx-auto">
               </div>
            </SwiperSlide>
         {/* </div> */}
      </Swiper>
   </div>
</div>
</div>