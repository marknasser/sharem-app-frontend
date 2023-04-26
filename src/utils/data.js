export const categories = [
  {
    name: "cars",
    image:
      "https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg",
  },
  {
    name: "fitness",
    image:
      "https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg",
  },
  {
    name: "wallpaper",
    image:
      "https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg",
  },
  {
    name: "websites",
    image:
      "https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg",
  },
  {
    name: "photo",
    image:
      "https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg",
  },
  {
    name: "food",
    image:
      "https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg",
  },
  {
    name: "nature",
    image:
      "https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg",
  },
  {
    name: "art",
    image:
      "https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg",
  },
  {
    name: "travel",
    image:
      "https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg",
  },
  {
    name: "quotes",
    image:
      "https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg",
  },
  {
    name: "cats",
    image:
      "https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg",
  },
  {
    name: "dogs",
    image:
      "https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg",
  },
  {
    name: "others",
    image:
      "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
          _id,
          destination,
          postedBy->{
            _id,
            userName,
            image
          },
          save[]{
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
        image{
          asset->{
            url
          }
        },
        _id,
        title, 
        about,
        category,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
       save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
        comments[]{
          comment,
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        }
      }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
            image{
              asset->{
                url
              }
            },
                _id,
                destination,
                postedBy->{
                  _id,
                  userName,
                  image
                },
                save[]{
                  _key,
                  postedBy->{
                    _id,
                    userName,
                    image
                  },
                },
              }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
        image{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
  return query;
};

const SearchSVG = (
  <svg
    width="160"
    height="160"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="StyledSearchCoursewareSVG-sc-zh8ivn bjfkYL"
  >
    <circle cx="80" cy="80" r="65" fill="#DCF6FF"></circle>
    <ellipse
      cx="67.5"
      cy="56"
      rx="25"
      ry="24.5"
      transform="rotate(90 67.5 56)"
      fill="#00BAFF"
      fill-opacity="0.19"
    ></ellipse>
    <g filter="url(#filter0_d_2012_8619)">
      <path
        d="M62.2131 104.443C60.4386 104.443 59 103.004 59 101.23L59 48.2131C59 46.4386 60.4386 45 62.2131 45L104.787 45C106.561 45 108 46.4386 108 48.2131L108 101.23C108 103.004 106.561 104.443 104.787 104.443L62.2131 104.443Z"
        fill="white"
      ></path>
      <rect
        x="64.623"
        y="68.2952"
        width="37.7541"
        height="0.803279"
        rx="0.401639"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="70.7048"
        width="24.0984"
        height="0.803279"
        rx="0.401639"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="78"
        width="37.7541"
        height="1"
        rx="0.5"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="80"
        width="26.5082"
        height="1"
        rx="0.5"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="88"
        width="28.1147"
        height="1"
        rx="0.5"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="89.9836"
        width="28.1147"
        height="1"
        rx="0.5"
        fill="#E3EBFA"
      ></rect>
      <rect
        x="64.623"
        y="97"
        width="9.63934"
        height="1"
        rx="0.5"
        fill="#E3EBFA"
      ></rect>
      <path
        d="M100.739 50.623C102.088 50.623 103.181 51.7162 103.181 53.0646L103.181 71.4766C103.181 72.825 102.088 73.9181 100.739 73.9181L67.0648 73.9181C65.7164 73.9181 64.6233 72.825 64.6233 71.4766L64.6233 53.0646C64.6233 51.7162 65.7164 50.623 67.0648 50.623L100.739 50.623Z"
        fill="#83D9F9"
      ></path>
      <path
        d="M91.0728 62.5393L100.771 73.918L69.4426 73.918L80.1089 62.3299C83.0859 59.0956 88.2214 59.1937 91.0728 62.5393Z"
        fill="#ADEFFF"
      ></path>
      <path
        d="M64.6229 72.0876L64.623 69.2588L68.3056 64.354C69.8126 62.3468 72.8463 62.416 74.2602 64.4898L80.6885 73.9179L66.4541 73.9179C65.4428 73.9179 64.6229 73.0989 64.6229 72.0876Z"
        fill="#ADEFFF"
      ></path>
      <circle cx="75.5779" cy="57.5779" r="4.5779" fill="#E1F4FB"></circle>
    </g>
    <g filter="url(#filter1_d_2012_8619)">
      <path
        d="M117.167 84C118.731 84 120 85.2685 120 86.8333L120 107L86 107L86 86.8333C86 85.2685 87.2685 84 88.8333 84L117.167 84Z"
        fill="#83D9F9"
      ></path>
      <ellipse
        cx="96"
        cy="91"
        rx="4"
        ry="4"
        transform="rotate(90 96 91)"
        fill="#6559FF"
      ></ellipse>
      <ellipse
        cx="101"
        cy="100"
        rx="4"
        ry="4"
        transform="rotate(90 101 100)"
        fill="#00BAFF"
      ></ellipse>
      <ellipse
        cx="105"
        cy="91"
        rx="4"
        ry="4"
        transform="rotate(90 105 91)"
        fill="#00BAFF"
      ></ellipse>
      <ellipse
        cx="110"
        cy="100"
        rx="4"
        ry="4"
        transform="rotate(90 110 100)"
        fill="#00BAFF"
      ></ellipse>
      <path
        d="M120 106.958L120 116.167C120 117.731 118.731 119 117.167 119L88.8333 119C87.2685 119 86 117.731 86 116.167L86 106.958L120 106.958Z"
        fill="white"
      ></path>
      <path
        d="M89 110.5C89 110.224 89.2239 110 89.5 110H105.781C106.057 110 106.281 110.224 106.281 110.5C106.281 110.776 106.057 111 105.781 111H89.5C89.2239 111 89 110.776 89 110.5Z"
        fill="#E3EBFA"
      ></path>
      <path
        d="M90.6361 113.415C90.6785 113.284 90.8632 113.284 90.9056 113.415L91.1366 114.126C91.1556 114.184 91.21 114.224 91.2713 114.224H92.019C92.1562 114.224 92.2133 114.399 92.1023 114.48L91.4974 114.919C91.4477 114.955 91.427 115.019 91.4459 115.078L91.677 115.789C91.7194 115.919 91.57 116.028 91.459 115.947L90.8541 115.508C90.8045 115.472 90.7372 115.472 90.6876 115.508L90.0827 115.947C89.9717 116.028 89.8223 115.919 89.8647 115.789L90.0957 115.078C90.1147 115.019 90.0939 114.955 90.0443 114.919L89.4394 114.48C89.3284 114.399 89.3854 114.224 89.5227 114.224H90.2703C90.3317 114.224 90.3861 114.184 90.4051 114.126L90.6361 113.415Z"
        fill="#00BAFF"
      ></path>
    </g>
    <path
      d="M53.6548 75.7072L48.4603 70.5356L40.1641 78.7949L45.3593 83.9665L53.6548 75.7072Z"
      fill="#00BAFF"
    ></path>
    <path
      d="M44.5752 74.3771C45.3469 75.3282 46.1667 76.2391 47.0315 77.1064C47.9028 77.9675 48.8176 78.7835 49.7723 79.5512L53.6539 75.6869L48.4568 70.5344L44.5752 74.3771Z"
      fill="#3499D6"
    ></path>
    <path
      d="M12.0556 111.948C9.31481 109.219 9.31481 104.766 12.0556 102.036L36.5731 77.6299C36.7324 77.4691 36.9219 77.3414 37.1308 77.2543C37.3397 77.1672 37.5638 77.1223 37.7901 77.1223C38.0165 77.1223 38.2406 77.1672 38.4495 77.2543C38.6583 77.3414 38.8479 77.4691 39.0072 77.6299L46.5273 85.1175C46.6888 85.2753 46.817 85.4638 46.9046 85.6719C46.9922 85.8799 47.0373 86.1034 47.0373 86.3291C47.0373 86.5549 46.9922 86.7783 46.9046 86.9864C46.817 87.1945 46.6888 87.3829 46.5273 87.5407L22.011 111.948C19.2697 114.677 14.7963 114.677 12.0556 111.948Z"
      fill="#6559FF"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.972 54.9692C97.972 70.9684 84.9439 83.9387 68.8727 83.9391C52.8013 83.9391 39.7734 70.9693 39.7734 54.9699C39.7734 38.9704 52.8013 26 68.8721 26C84.9436 26 97.972 38.9698 97.972 54.9692ZM91.1311 54.9693C91.1311 67.1949 81.1756 77.1064 68.8951 77.1064C56.6147 77.1064 46.6592 67.1949 46.6592 54.9693C46.6592 42.7443 56.6147 32.8335 68.8951 32.8335C81.1756 32.8335 91.1311 42.7437 91.1311 54.9693Z"
      fill="#00BAFF"
    ></path>
    <path
      d="M68.9941 38C59.6054 38 51.9941 45.6112 51.9941 54.9995"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    ></path>
    <path
      d="M47.3614 76.4292L46.9443 82.389L50.6065 78.6993L47.3607 76.4292H47.3614Z"
      fill="#3499D6"
    ></path>
    <path
      d="M43.3374 90.7105L33.3832 80.8003L31.5684 82.6062L41.5232 92.5164L43.3374 90.7105Z"
      fill="#00BAFF"
    ></path>
    <path
      d="M37.4492 86.6677L37.1201 96.9063L42.4269 91.6231L37.4492 86.6684V86.6677Z"
      fill="#00BAFF"
    ></path>
    <defs>
      <filter
        id="filter0_d_2012_8619"
        x="49.3607"
        y="38.5738"
        width="68.2787"
        height="78.7213"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dy="3.21311"></feOffset>
        <feGaussianBlur stdDeviation="4.81967"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.352941 0 0 0 0 0.321569 0 0 0 0 0.501961 0 0 0 0.08 0"
        ></feColorMatrix>
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2012_8619"
        ></feBlend>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2012_8619"
          result="shape"
        ></feBlend>
      </filter>
      <filter
        id="filter1_d_2012_8619"
        x="77.5"
        y="78.3333"
        width="51"
        height="52"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dy="2.83333"></feOffset>
        <feGaussianBlur stdDeviation="4.25"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.352941 0 0 0 0 0.321569 0 0 0 0 0.501961 0 0 0 0.08 0"
        ></feColorMatrix>
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2012_8619"
        ></feBlend>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2012_8619"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);
