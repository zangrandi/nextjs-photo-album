import React from "react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-start py-12 px-6 lg:px-8 bg-gray-100 dark:bg-secondary-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center font-black text-white text-9xl mt-8">
          404
        </h1>
        <p className="text-white text-center text-base font-medium mt-2">
          PAGE NOT FOUND
        </p>
      </div>
    </section>
  );
}
