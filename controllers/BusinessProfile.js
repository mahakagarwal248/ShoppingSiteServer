import businessProfile from "../models/businessProfile.js";
import products from "../models/products.js";
import user from "../models/user.js";

export const addProfile = async (req, res) => {
  const { name, description, socialMediaLinks, email, mobile, merchantId } =
    req.body;

  const existingProfile = await businessProfile.findOne({
    merchantId: merchantId,
  });
  if (existingProfile && existingProfile?.isActive) {
    return res.status(400).json("Profile already exists");
  }
  const newProfile = {
    name,
    description,
    socialMediaLinks,
    contactDetails: {
      email,
      mobile,
    },
    merchantId,
  };
  try {
    if (existingProfile && !existingProfile?.isActive) {
      await businessProfile.findOneAndUpdate({ merchantId }, { newProfile });
      return res.status(200).json("Profile added successfully");
    }
    await businessProfile.create(newProfile);
    return res.status(200).json("Profile added successfully");
  } catch (error) {
    return res.status(400).json("Couldn't added a new profile");
  }
};

export const getProfileById = async (req, res) => {
  const { merchantId } = req.query;
  try {
    const profile = await businessProfile.findOne({
      merchantId: merchantId,
      isActive: true,
    });
    if (!profile) return res.status(404).json({ message: "No profile found" });
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await businessProfile.find();
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { merchantId } = req.query;
  try {
    await businessProfile.findOneAndUpdate({ merchantId }, { isActive: false });
    await products.updateMany(
      { merchantId, isActive: true },
      { isActive: false }
    );
    await user.findOneAndUpdate({ _id: merchantId }, { isActive: false });
    return res.status(200).json({ msg: "Profile deleted sucessfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
