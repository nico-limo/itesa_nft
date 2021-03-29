import React from "react";
//utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { useInput } from "../utils/hooks/useInput";

const NewArtwork = () => {
  const title = useInput("title");
  const descrpition = useInput("description");
  const imgURI = useInput("imgURI");
  const price = useInput("price");
  const { newPiece } = ArtFunctions();
  const { updatePiece } = ArtFunctions();
  return (
    <div>
      <h2>NewArtwork</h2>
      <form>
        <input type="text" {...title} placeholder="title" />
        <input type="text" {...imgURI} placeholder="img url" />
        <input type="text" {...descrpition} placeholder="description" />
        <input type="text" {...price} placeholder="price" />
        <button
          type="submit"
          onClick={(e) =>
            newPiece(
              e,
              title.value,
              imgURI.value,
              descrpition.value,
              price.value
            )
          }
        >
          add piece
        </button>
      </form>
    </div>
  );
};

export default NewArtwork;
