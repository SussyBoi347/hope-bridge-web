import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function PhysicalStory() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await base44.functions.invoke('analyzePhysicalStory', formData);

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setError(response.data.error || 'Failed to analyze image');
      }
    } catch (err) {
      setError(err.message || 'Failed to process image');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">Story Added!</h2>
          <p className="text-white mb-8">
            Your physical story has been captured and added to our community wall.
          </p>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setSelectedFile(null);
              setPreview(null);
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black rounded-full">
            Upload Another Story
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-6xl">📸</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight mt-4">
              Share Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Physical Story
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Take a photo of your handwritten or printed story and our AI will add it to the community wall automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="relative py-24 px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg">

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-black mb-6">Upload Story Photo</h2>

          {/* Image Preview */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6">
              <img src={preview} alt="Preview" className="w-full rounded-lg max-h-64 object-cover" />
            </motion.div>
          )}

          {/* File Input */}
          <label className="block mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isAnalyzing}
            />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-black font-medium">
                {selectedFile ? selectedFile.name : 'Click to upload a photo'}
              </p>
              <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
            </div>
          </label>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white rounded-full py-3 font-semibold">
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              'Add Story'
            )}
          </Button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            The AI will automatically extract the story text from your photo and add it to our community wall.
          </p>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Tips for Best Results</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-2">📝 Clear Text</h4>
              <p className="text-gray-300 text-sm">Make sure the text is clearly visible and readable in the photo.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-2">💡 Good Lighting</h4>
              <p className="text-gray-300 text-sm">Take the photo in good lighting to ensure text clarity.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-2">📐 Straight Angle</h4>
              <p className="text-gray-300 text-sm">Position the story straight for better text recognition.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-2">📄 Full Story</h4>
              <p className="text-gray-300 text-sm">Include the entire story in one photo if possible.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}