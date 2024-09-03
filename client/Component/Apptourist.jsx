import { useEffect, useState } from "react";
import trips from "../../server/db";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Apptour() {
  const [tourlist, setTourList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchtourist = async (text) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      setTourList(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (searchInput) {
      setTourList(searchInput);
    } else {
      setTourList(trips);
    }
  }, [searchInput]);

  const copyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(`Copied to clipboard: ${url}`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <header className="flex justify-center mt-5">
        <h1 className="text-5xl text-blue-700 font-bold">เที่ยวไหนดี</h1>
      </header>
      <div className="flex flex-col justify-center items-center mt-5">
        <h3 className="text-center">ค้นหาที่เที่ยว</h3>
        <label htmlFor="fname"></label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="w-[500px] border-solid rounded-lg border-b-4 text-center mt-3"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        ></input>
      </div>

      <section className="flex justify-center mt-10 ">
        <div>
          <div className="">
            {tourlist.map((item, index) => (
              <div className="flex flex-row" key={index}>
                {item.photos.length > 0 && (
                  <img
                    src={item.photos[0]}
                    alt="first photo"
                    className="w-[400px] h-[300px] rounded-3xl mx-5"
                  />
                )}
                <div className="flex flex-col gap-2">
                  <div>
                    <h2 className="font bold text-2xl">{item.title}</h2>
                  </div>
                  <div>
                    <p>
                      {" "}
                      {item.description.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </p>
                  </div>
                  <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-violet-700"
                    >
                      อ่านต่อ
                    </a>
                  </div>
                  <div>
                    <div className="flex flex-row gap-2">
                      หมวด:
                      {item.tags.map((tag, index) => (
                        <button
                          key={index}
                          className="underline text-orange-700"
                          onClick={(texts) =>
                            setSearchInput((prevText) =>
                              prevText ? `${prevText} ${tag}` : tag
                            )
                          }
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="w-[100px] h-[100px]">
                      {item.photos.length > 1 && (
                        <img
                          src={item.photos[1]}
                          alt="second photo"
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <div className="w-[100px] h-[100px]">
                      {item.photos.length > 2 && (
                        <img
                          src={item.photos[2]}
                          alt="thrid photo"
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <div className="w-[100px] h-[100px]">
                      {item.photos.length > 3 && (
                        <img
                          src={item.photos[3]}
                          alt="four photo"
                          className="rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <ContentCopyIcon
                      color="primary"
                      fontSize="large"
                      onClick={() => copyToClipboard(item.url)}
                      className="cursor-pointer relative left-[600px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apptour;
