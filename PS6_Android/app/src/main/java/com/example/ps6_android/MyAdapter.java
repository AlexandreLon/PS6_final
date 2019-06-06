package com.example.ps6_android;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.ps6_android.Models.RealTimeAppointment;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private List<RealTimeAppointment> mDataset = new ArrayList<>();

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        private TextView textview;
        private  TextView textview2;
        private  TextView textview3;
        // each data item is just a string in this case
        public RelativeLayout relativeLayout;
        public MyViewHolder(RelativeLayout v) {
            super(v);
            relativeLayout = v;
            textview = v.findViewById(R.id.textView3);
            textview2 = v.findViewById(R.id.textView4);
            textview3 = v.findViewById(R.id.textView5);
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public MyAdapter(List<RealTimeAppointment> myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MyAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                     int viewType) {
        // create a new view
        RelativeLayout v = (RelativeLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recycler, parent, false);


        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
//        TextView text = holder.relativeLayout.
//        holder.textView
//                t.s(mDataset[position]);

        holder.textview.setText(mDataset.get(position).getAppointment().getApplicant().getFirstname());
        holder.textview2.setText(mDataset.get(position).getAppointment().getApplicant().getLastname());

        String strDateFormat = "hh:mm";
        DateFormat dateFormat = new SimpleDateFormat(strDateFormat);
        String formattedDate= dateFormat. format(mDataset.get(position).getTimestamp());

        holder.textview3.setText(formattedDate);


    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        if(mDataset == null) return 0;
        return mDataset.size();
    }
}
