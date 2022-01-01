export const imagesrc = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "/images/logo.png";
    // return {name[0]};
  }
};
