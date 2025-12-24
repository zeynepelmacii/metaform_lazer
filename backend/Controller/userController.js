const userModel = require('../Model/User');
const hashPassword = require('../Utils/Auth/HashPassword');
const validateNewUser = require('../Utils/Auth/ValidateNewUser');

const getAllUsers = async (req, res) => {
    
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


const getUserById = async (req, res) => {
    const userId = req.params.id;       
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const getUserByEmail = async (req, res) => {    
    const userEmail = req.params.email;
    try {
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }           
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

const updatePassword = async (req, res) => {
    const userEmail = req.params.email;
    const { password } = req.body;

    try {
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password;
        validateNewUser(user) ? await user.save() : console.error('Password validation failed');

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }   
}

const updateEmail = async (req, res) => {
    const userId = req.params.id;
    const { email } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.email = email;
        validateNewUser(user) ? await user.save() : console.error('Email validation failed');
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}   

const deleteUser =  async (req, res) => {
    const userId = req.params.id;   
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }   
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

const inactivateUser =  async (req, res) => {
    const userId = req.params.id;   
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isActive = false;
        await user.save();
        res.status(200).json({ message: 'User inactivated successfully' });
    }catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}


const activateUser =  async (req, res) => {
    const userId = req.params.id;   
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isActive = true;
        await user.save();
        res.status(200).json({ message: 'User activated successfully' });
    }catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}


const verifyUser =  async (req, res) => {
    const userId = req.params.id;   
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }



        // buraya doğrulama kodu kontrolü eklenebilir

        
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'User verified successfully' });
    }catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}


module.exports = {
    getAllUsers, getUserById, getUserByEmail, updateUser, updatePassword, updateEmail, deleteUser, inactivateUser, activateUser, verifyUser
};